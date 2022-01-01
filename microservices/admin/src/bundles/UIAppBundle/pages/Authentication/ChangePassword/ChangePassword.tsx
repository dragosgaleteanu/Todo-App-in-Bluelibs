import {
  useUIComponents,
  useTranslate,
  use,
  useGuardian,
  useRouter,
} from "@bluelibs/x-ui";
import { useState } from "react";
import { LockOutlined } from "@ant-design/icons";
import { Form, Input, Button, Alert, Card, PageHeader } from "antd";
import { RedirectUserService } from "@bundles/UIAppBundle/services/RedirectUser.service";
import { Routes } from "@bundles/UIAppBundle";

type FormInput = {
  oldPassword: string;
  newPassword: string;
};

export function ChangePassword() {
  const tl = useTranslate("authentication.changePassword");
  const guardian = useGuardian();
  const router = useRouter();

  const UIComponents = useUIComponents();
  const [submitError, setSubmitError] = useState(null);
  const [isCompleted, setIsComplete] = useState(false);

  const onSubmit = (data: FormInput) => {
    const { oldPassword, newPassword } = data;

    guardian
      .changePassword(oldPassword, newPassword)
      .then(() => {
        setIsComplete(true);

        router.go(Routes.HOME);
      })
      .catch((err) => {
        setSubmitError(err.toString());
      });
  };
  const style = { width: 400, border: 0 };
  return (
    <UIComponents.AdminLayout>
      <PageHeader title={tl("header")} />
      <Card style={style} className="change-password-page">
        {isCompleted && <Alert type="success" message={tl("successMessage")} />}
        {!isCompleted && (
          <Form
            onFinish={(data) => onSubmit(data)}
            className="authentication-form"
          >
            <Form.Item
              name="oldPassword"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder={tl("fields.current")}
              />
            </Form.Item>
            <Form.Item name="newPassword" rules={[{ required: true }]}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder={tl("fields.newPassword")}
              />
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
            {submitError && <Alert message={`${submitError}`} type="error" />}
          </Form>
        )}
      </Card>
    </UIComponents.AdminLayout>
  );
}
