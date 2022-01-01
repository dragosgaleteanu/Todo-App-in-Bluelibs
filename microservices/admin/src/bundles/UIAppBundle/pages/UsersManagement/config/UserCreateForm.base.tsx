/** @overridable */
import { XRouter, use, IComponents } from "@bluelibs/x-ui";
import { SmileOutlined } from "@ant-design/icons";
import * as Ant from "antd";
import { XFormElementType, XForm } from "@bluelibs/x-ui-admin";
import { Routes } from "@bundles/UIAppBundle";
import { Service, Inject } from "@bluelibs/core";
import { features } from "./features";

import { User, UsersCollection } from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class UserCreateForm extends XForm {
  @Inject(() => UsersCollection)
  collection: UsersCollection;

  build() {
    const { UIComponents } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "todos",
        label: t("management.users.fields.todos"),
        name: ["todos"],
        required: true,
        isList: true,
        nest: [
          {
            id: "title",
            label: t("management.users.fields.todos.title"),
            name: ["todos", "title"],
            required: true,
            initialValue: [],
            component: Ant.Input,
          },

          {
            id: "description",
            label: t("management.users.fields.todos.description"),
            name: ["todos", "description"],
            required: true,
            initialValue: [],
            component: Ant.Input,
          },

          {
            id: "checked",
            label: t("management.users.fields.todos.checked"),
            name: ["todos", "checked"],
            required: true,
            initialValue: [],
            render: (props) => (
              <Ant.Form.Item {...props}>
                <Ant.Radio.Group>
                  <Ant.Radio value={false} key={0}>
                    No
                  </Ant.Radio>
                  <Ant.Radio value={true} key={1}>
                    Yes
                  </Ant.Radio>
                </Ant.Radio.Group>
              </Ant.Form.Item>
            ),
          },
        ],
        initialValue: [],
      },

      {
        id: "roles",
        label: t("management.users.fields.roles"),
        name: ["roles"],
        required: true,
        initialValue: [],
        render: (props) => (
          <Ant.Form.Item {...props}>
            <Ant.Select
              mode="multiple"
              placeholder={t("management.users.fields.roles")}
            >
              <Ant.Select.Option value="ADMIN" key="ADMIN">
                Admin
              </Ant.Select.Option>
              <Ant.Select.Option value="USER" key="USER">
                User
              </Ant.Select.Option>
            </Ant.Select>
          </Ant.Form.Item>
        ),
      },

      {
        id: "isEnabled",
        label: t("management.users.fields.isEnabled"),
        name: ["isEnabled"],
        required: true,
        render: (props) => (
          <Ant.Form.Item {...props}>
            <Ant.Radio.Group>
              <Ant.Radio value={false} key={0}>
                No
              </Ant.Radio>
              <Ant.Radio value={true} key={1}>
                Yes
              </Ant.Radio>
            </Ant.Radio.Group>
          </Ant.Form.Item>
        ),
      },

      {
        id: "profile",
        label: t("management.users.fields.profile"),
        name: ["profile"],
        required: true,
        nest: [
          {
            id: "firstName",
            label: t("management.users.fields.profile.firstName"),
            name: ["profile", "firstName"],
            required: true,
            component: Ant.Input,
          },

          {
            id: "lastName",
            label: t("management.users.fields.profile.lastName"),
            name: ["profile", "lastName"],
            required: true,
            component: Ant.Input,
          },
        ],
      },
    ]);
  }

  onSubmit(document: Partial<User>): Promise<void> {
    const { t } = this.i18n;

    return this.collection
      .insertOne(document)
      .then(({ _id }) => {
        Ant.notification.success({
          message: t("generics.success"),
          description: t("management.users.create_confirmation"),
          icon: <SmileOutlined />,
        });

        if (features.view) {
          return this.router.go(Routes.USERS_VIEW, {
            params: {
              id: _id,
            },
          });
        }
        if (features.list) {
          return this.router.go(Routes.USERS_LIST);
        }
        if (features.edit) {
          return this.router.go(Routes.USERS_EDIT, {
            params: {
              id: _id,
            },
          });
        }
      })
      .catch((err) => {
        Ant.notification.warn({
          message: t("generics.error"),
          description: t("generics.error_message"),
        });
      });
  }
}
