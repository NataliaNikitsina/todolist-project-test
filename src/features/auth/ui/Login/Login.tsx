import { selectThemeMode, setIsLoggedIn } from "@/app/app-slice"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid2"
import TextField from "@mui/material/TextField"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginInputs, loginSchema } from "@/features/auth/model/schema.ts"
import { useLoginMutation } from "@/features/auth/api/_authApi.ts"
import { ResultCode } from "@/common/enums"
import { AUTH_TOKEN } from "@/common/constants/constants.ts"

export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()

  const [loginTrigger] = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<LoginInputs>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    resolver: zodResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    loginTrigger(data)
      .unwrap()
      .then((res) => {
        if (res.resultCode === ResultCode.Success) {
          localStorage.setItem(AUTH_TOKEN, res.data.token)
          dispatch(setIsLoggedIn({ isLoggedIn: true }))
          reset()
        }
      })}

    return (
      <Grid container justifyContent={"center"}>
        <FormControl>
          <FormLabel>
            <p>
              To login get registered
              <a
                style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
                href="https://social-network.samuraijs.com"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              <b>Email:</b> free@samuraijs.com
            </p>
            <p>
              <b>Password:</b> free
            </p>
          </FormLabel>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <TextField label="Email" margin="normal" error={!!errors.email} {...register("email")} />
              {errors.email && (
                <span role={"alert"} style={{ color: "red" }}>
                  {errors.email.message}
                </span>
              )}
              <TextField type="password" label="Password" margin="normal" {...register("password")} />
              {errors.password && (
                <span role={"alert"} style={{ color: "red" }}>
                  {errors.password.message}
                </span>
              )}
              <FormControlLabel
                label="Remember me"
                control={
                  <Controller
                    name="rememberMe"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox onChange={(e) => onChange(e.target.checked)} checked={value} />
                    )}
                  />
                }
              />
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    )
  }

