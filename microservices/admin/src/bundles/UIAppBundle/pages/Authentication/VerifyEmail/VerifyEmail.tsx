import { use, useRouter, useTranslate } from "@bluelibs/x-ui";
import { useEffect, useState } from "react";
import { Row, Col, Alert, Card } from "antd";
import { RedirectUserService } from "@bundles/UIAppBundle/services/RedirectUser.service";
import { Routes } from "@bundles/UIAppBundle";
import { useAppGuardian } from "@bundles/UIAppBundle/services/AppGuardian";

export function VerifyEmail(props: { token: string }) {
  const { token } = props;
  const redirectUserService = use(RedirectUserService);
  const guardian = useAppGuardian();
  const router = useRouter();
  const tl = useTranslate("authentication.verifyEmail");

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(true);
  const [emailVerificationError, setEmailVerificationError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      guardian
        .verifyEmail(token)
        .then(async () => {
          setIsVerifyingEmail(false);
          setIsEmailVerified(true);

          setTimeout(async () => {
            const nextRoute =
              await redirectUserService.redirectUserAfterAuthentication();

            router.go(Routes[nextRoute]);
          }, 3500);
        })
        .catch((err) => {
          setIsVerifyingEmail(false);
          setEmailVerificationError(err.toString());
        });
    }, 1000);
  }, []);
  const style = { minHeight: "100vh" };
  return (
    <Row
      justify="center"
      align="middle"
      style={style}
      className="verify-email-page"
    >
      <Col sm={24} md={12} lg={6}>
        <Card title={tl("header")}>
          {isVerifyingEmail && <Alert message={tl("verifying")} />}
          {isEmailVerified && <Alert type="success" message={tl("success")} />}
          {emailVerificationError && (
            <Alert type="error" message={tl("errored")} />
          )}
        </Card>
      </Col>
    </Row>
  );
}
