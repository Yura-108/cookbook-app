"use client";

import {Form} from "@heroui/form";
import {Input} from "@heroui/input";
import {Alert, Button} from "@heroui/react";
import React, {useState} from "react";
import {signInWithCredentials} from "@/actions/sign-in";
import {AnimatePresence, motion} from "framer-motion";


interface IProps {
  onClose: () => void;
}

const LoginForm = ({onClose}: IProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signInWithCredentials(formData.email, formData.password);
    console.log("res", result)

    if (result?.error) {
      setError(result?.error);
    } else {
      onClose();
      window.location.reload()
    }
  }

  return (
    <Form className={"w-full"} onSubmit={handleSubmit}>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Alert
              variant="flat"
              color="danger"
              className="mb-4"
              onClose={() => setError("")}
              isClosable
            >
              <span className="font-medium">{error}</span>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <Input
        aria-label={"Email"}
        isRequired={true}
        name={"email"}
        placeholder={"Введите email"}
        type={"email"}
        value={formData.email}
        classNames={{
          inputWrapper: `bg-default-100 transition-colors ${error ? "border-danger-200" : ""}`,
          input: "text-sm focus:outline-none"
        }}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        validate={(value) => {
          if (!value) return "Почта обязательна";
          return null;
        }}
      />
      <Input
        isRequired={true}
        name="password"
        placeholder="Введите пароль"
        type={"password"}
        value={formData.password}
        classNames={{
          inputWrapper: `bg-default-100 transition-colors ${error ? "border-danger-200" : ""}`,
          input: "text-sm focus:outline-none"
        }}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        validate={(value) => {
          if (!value) return "Пароль обязателен";
          return null;
        }}
      />
      <div  className="flex w-[100%] gap-4 items-center pt-8 justify-end">
        <Button variant={"light"} onPress={onClose}>Отмена</Button>
        <Button color={"primary"} type={"submit"}>Войти</Button>
      </div>
    </Form>
  )
}

export default LoginForm;