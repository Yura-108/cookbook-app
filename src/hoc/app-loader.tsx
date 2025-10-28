"use client";

import React, {useEffect} from "react";
import {useSession} from "next-auth/react";
import {useAuthStore} from "@/store/auth.store";
import {useIngredientStore} from "@/store/ingredient.store";
import {useRecipeStore} from "@/store/recipe.store";

interface IProps {
  children: React.ReactNode;
}

const AppLoader = ({children}: IProps) => {
  const {data: session, status} = useSession();
  const {loadIngredients} = useIngredientStore();
  const {isAuth, setAuthState} = useAuthStore();
  const {loadRecipes } = useRecipeStore();

  useEffect(() => {
    setAuthState(status, session);
  }, [status, session, setAuthState]);

  useEffect(() => {
    if (isAuth) {
      void loadIngredients();
    }
  }, [isAuth, loadIngredients]);

  useEffect(() => {
    void loadRecipes();
  }, [loadRecipes]);

  return <>{children}</>
}

export default AppLoader;

