import { use, useGuardian, useRouter, useTranslate } from "@bluelibs/x-ui";
import { useState } from "react";
import { Form, Input, Button, Row, Col, Alert, Card } from "antd";
import { RedirectUserService } from "@bundles/UIAppBundle/services/RedirectUser.service";
import { Routes } from "@bundles/UIAppBundle";

type FormInput = {
  email: string;
};

export function ForgotPassword() {
  const t = useTranslate();
  const tl = useTranslate("authentication.forgotPassword");
  const guardian = useGuardian();
  const router = useRouter();

  const [submitError, setSubmitError] = useState(null);
  const [isCompleted, setIsComplete] = useState(false);

  const onSubmit = (data: FormInput) => {
    guardian
      .forgotPassword(data.email)
      .then(() => {
        setIsComplete(true);

        router.go(Routes.HOME);
      })
      .catch((err) => {
        setSubmitError(err.toString());
      });
  };

  const style = { minHeight: "100vh" };
  return (
    <Row
      justify="center"
      align="middle"
      style={style}
      className="forgot-password-page"
    >
      <Col sm={24} md={12} lg={6}>
        <Card title={tl("header")}>
          {isCompleted && <Alert type="success" message={tl("success")} />}
          {!isCompleted && (
            <Form
              onFinish={(data) => onSubmit(data)}
              className="authentication-form"
            >
              <Form.Item name="email" rules={[{ required: true }]}>
                <Input placeholder={tl("fields.email")} />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="authentication-form-button"
                >
                  {tl("submit")}
                </Button>
              </Form.Item>
              {submitError && (
                <Alert message={t("generics.error")} type="error" />
              )}
            </Form>
          )}
        </Card>
      </Col>
    </Row>
  );
}
