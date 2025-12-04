import {NextRequest, NextResponse} from "next/server";
import {getToken, GetTokenParams} from "next-auth/jwt"

// Роли пользователей CRM
type UserRole = 'FREELANCER' | 'ADMIN' | 'CLIENT';

// Публичные маршруты, которые не требуют авторизации
const PUBLIC_PATHS = [
  '/api/auth',
  '/login',
  '/register',
  '/error',
  '/_next',
  '/favicon.ico'
];

// Определение доступа к маршрутам по ролям (отсортировано по специфичности - длинные маршруты первыми)
const ROLE_ACCESS: Array<{ route: string; roles: UserRole[] }> = [
  { route: '/invoices/new', roles: ['FREELANCER', 'ADMIN'] },
  { route: '/invoices', roles: ['FREELANCER', 'ADMIN', 'CLIENT'] },
  { route: '/clients', roles: ['FREELANCER', 'ADMIN'] },
];

export async function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;

  // Пропускаем публичные маршруты
  if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  let params: GetTokenParams = {
    req: request,
    secret: process.env.AUTH_SECRET ?? "secret"
  };

  if (process.env.NODE_ENV === "production") {
    params = {
      ...params,
      cookieName: "__Secure-authjs.session-token"
    }
  }

  const token = await getToken(params);

  // Защищенные маршруты CRM
  const protectedRoutes = ["/clients", "/invoices/new", "/invoices/:path*"];

  if (protectedRoutes.some((route) => pathname.startsWith(route.replace(":path", "")))) {
    if (!token) {
      const url = new URL("/error", request.url);
      url.searchParams.set("message", "недостаточно прав");
      return NextResponse.redirect(url);
    }

    // Получаем роль пользователя из токена (по умолчанию FREELANCER)
    const userRole = (token.role as UserRole) || 'FREELANCER';

    // Проверяем доступ по ролям для конкретных маршрутов
    for (const { route, roles: allowedRoles } of ROLE_ACCESS) {
      if (pathname.startsWith(route)) {
        if (!allowedRoles.includes(userRole)) {
          return new NextResponse('Доступ запрещен', { status: 403 });
        }
        break;
      }
    }

    // Передаем информацию о пользователе в headers для SSR
    const response = NextResponse.next();
    response.headers.set('x-user-id', String(token.id || ''));
    response.headers.set('x-user-role', userRole);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/clients", "/invoices/new", "/invoices/:path*"]
}