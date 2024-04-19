import React from "react";
import styles from "./styles.module.scss";
import Button from "../../components/Button/Button";
import LeftArrow from "../../components/Icons/LeftArrow";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import InputMask from "react-input-mask";
import { TextField } from "@mui/material";

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

const CreateAccount = () => {
  const navigate = useNavigate();

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
            <TextField
              helperText={createAccountForm.errors.name}
              error={Boolean(
                createAccountForm.errors.name && createAccountForm.touched.name
              )}
              onChange={createAccountForm.handleChange}
              fullWidth
              name="name"
              type="text"
              label="Nome"
              id="name"
            />
          </div>
          <div className={styles.inputWrapper}>
            <InputMask
              mask="(99) 99999-9999"
              onChange={createAccountForm.handleChange}
            >
              {(inputProps) => (
                <TextField
                  helperText={createAccountForm.errors.phone}
                  error={Boolean(
                    createAccountForm.errors.phone &&
                      createAccountForm.touched.phone
                  )}
                  name="phone"
                  fullWidth
                  {...inputProps}
                  type="text"
                  label="Telefone"
                  id="phone"
                />
              )}
            </InputMask>
          </div>
          <div className={styles.inputWrapper}>
            <TextField
              helperText={createAccountForm.errors.email}
              error={Boolean(
                createAccountForm.errors.email &&
                  createAccountForm.touched.email
              )}
              onChange={createAccountForm.handleChange}
              name="email"
              fullWidth
              type="text"
              label="Email"
              htmlFor="email"
            />
          </div>
          <div className={styles.inputWrapper}>
            <TextField
              fullWidth
              helperText={createAccountForm.errors.password}
              error={Boolean(
                createAccountForm.errors.password &&
                  createAccountForm.touched.password
              )}
              onChange={createAccountForm.handleChange}
              name="password"
              type="password"
              label="Senha"
              htmlFor="password"
            />
          </div>
          <Button type="submit" text="Criar conta" />
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
