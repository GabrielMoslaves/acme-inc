import React from "react";
import styles from "./styles.module.scss";
import Input from "../../components/Input";
import Button from "../../components/Button/Button";
import LeftArrow from "../../components/Icons/LeftArrow";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";

const CreateAccount = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required("campo obrigatório"),
    phone: yup.string().required("campo obrigatório"),
    email: yup.string().email("Email inválido").required("campo obrigatório"),
    password: yup
      .string()
      .min(6, "no mínimo 6 caracteres")
      .max(10, "no máximo 10 caracteres")
      .required("campo obrigatório"),
  });

  const handleSubmit = () => {
    const existingAccounts = localStorage.getItem("accounts");
    let accounts = [];

    if (existingAccounts) {
      accounts = JSON.parse(existingAccounts);
    }

    accounts.push(createAccountForm.values);
    localStorage.setItem("accounts", JSON.stringify(accounts));

    toast.success("Conta criada com sucesso");
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  const createAccountForm = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <div className={styles.container}>
      <div onClick={() => navigate(-1)} className={styles.backButton}>
        <LeftArrow />
        <span>Voltar</span>
      </div>
      <div className={styles.formContainer}>
        <h1>Crie uma conta</h1>
        <form
          className={styles.formContent}
          onSubmit={createAccountForm.handleSubmit}
        >
          <div className={styles.inputWrapper}>
            <Input
              onChange={(e) =>
                createAccountForm.setFieldValue("name", e.target.value)
              }
              type="text"
              label="Nome"
              id="name"
            />
            {createAccountForm.errors.name && (
              <p style={{ color: "red" }}> {createAccountForm.errors.name}</p>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <Input
              onChange={(e) =>
                createAccountForm.setFieldValue("phone", e.target.value)
              }
              type="text"
              label="Telefone"
              id="phone"
            />
            {createAccountForm.errors.phone && (
              <p style={{ color: "red" }}>{createAccountForm.errors.phone}</p>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <Input
              onChange={(e) =>
                createAccountForm.setFieldValue("email", e.target.value)
              }
              type="text"
              label="Email"
              htmlFor="email"
              id="email"
            />
            {createAccountForm.errors.email && (
              <p style={{ color: "red" }}> {createAccountForm.errors.email}</p>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <Input
              onChange={(e) =>
                createAccountForm.setFieldValue("password", e.target.value)
              }
              type="password"
              label="Senha"
              htmlFor="password"
              id="password"
            />
            {createAccountForm.errors.password && (
              <p style={{ color: "red" }}>
                {createAccountForm.errors.password}
              </p>
            )}
          </div>
          <Button type="submit" text="Criar conta" />
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
