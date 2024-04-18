import styles from "./styles.module.scss";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import Input from "../../components/Input";
import Box from "../../components/Box";

const schema = yup.object().shape({
  email: yup.string().email().required("campo obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve conter no minímo 6 caracteres")
    .max(10, "A senha deve conter no máximo 10 caracteres")
    .required("campo obrigatório"),
});

const Login = () => {
  const navigate = useNavigate();
  const registratedAccounts = JSON.parse(localStorage.getItem("accounts"));

  const handleAuthenticate = (values, form) => {
    form.setErrors({});
    const selectedAccount = registratedAccounts.find((item) => {
      return item.email === values.email;
    });

    if (!selectedAccount) {
      form.setFieldError("email", "Conta não encontrada");
      return;
    }
    if (selectedAccount && selectedAccount.password !== values.password) {
      form.setFieldError("password", "Senha incorreta");
    } else {
      localStorage.setItem(
        "session",
        JSON.stringify({ ...selectedAccount, token: uuidv4() })
      );
      navigate("/");
    }
  };

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: schema,
    onSubmit: handleAuthenticate,
  });

  return (
    <div className={styles.container}>
      <form onSubmit={loginForm.handleSubmit} className={styles.cardLogin}>
        <h1>Entrar</h1>
        <div>
          <Input
            label="Login"
            id="login"
            type="text"
            placeholder="Digite seu email"
            onChange={(e) => loginForm.setFieldValue("email", e.target.value)}
          />

          <p style={{ color: "red", height: 24 }}>{loginForm.errors.email}</p>
        </div>
        <div>
          <Input
            label="Senha"
            id="senha"
            type="password"
            placeholder="Digite sua senha"
            onChange={(e) =>
              loginForm.setFieldValue("password", e.target.value)
            }
          />

          <p style={{ color: "red", height: 24 }}>
            {loginForm.errors.password}
          </p>
        </div>
        <Button type="submit" text="Login" />
        <Box display="flex" justifyContent="center">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/criar-uma-conta"
          >
            Não tem uma conta? Clique aqui.
          </Link>
        </Box>
      </form>
    </div>
  );
};

export default Login;