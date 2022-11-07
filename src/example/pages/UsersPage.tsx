import React, { useContext, useRef } from "react";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { UserFieldsFragmentDoc } from "../graphql/generated/graphqlRequest";
import { CreateUserModal } from "../components/CreateUserModal";
import {
  useUpsertAddressMutation,
  useUpsertUsersMutation,
} from "../graphql/generated/resourceApi";
import { AdminComponentContext, AdminTable, useDataAdapter } from "../../lib";

const UsersPage: React.FC = () => {
  const { client } = useContext(AdminComponentContext);
  const { tableAdapter } = useDataAdapter("users", UserFieldsFragmentDoc);
  const [showAddUser, setShowAddUser] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const toast = useRef<Toast>(null);
  const userUpsert = useUpsertUsersMutation(client);
  const addressUpsert = useUpsertAddressMutation(client);
  const onSubmit = async (data: Record<string, any>) => {
    try {
      setLoading(true);
      await userUpsert.mutateAsync({
        objects: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
        },
      });
      await addressUpsert.mutateAsync({
        objects: {
          address1: data.address1,
          address2: data.address2,
          country: data.country,
          state: data.state,
          city: data.city,
          postalCode: data.postalCode,
        },
      });
      tableAdapter.reload();
      toast.current?.show({
        severity: "success",
        summary: "Success Message",
        detail: "Added User",
      });
      setShowAddUser(false);
    } catch (error: any) {
      console.error(error);
      toast.current?.show({
        severity: "error",
        summary: "Error Message",
        detail: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <CreateUserModal
        loading={loading}
        isOpen={showAddUser}
        onClose={() => setShowAddUser(false)}
        onSubmit={onSubmit}
      />
      <Card
        title={() => (
          <div className="flex flex-row gap-4 items-center justify-between">
            Users
            <Button
              icon="pi pi-plus"
              iconPos="right"
              label="Create User"
              className="p-button-text"
              onClick={() => setShowAddUser(true)}
            />
          </div>
        )}
      >
        <AdminTable className="mb-3" adapter={tableAdapter}>
          <Column field="id" header="ID" sortable filter />
          <Column field="firstName" header="Last Name" sortable filter />
          <Column field="lastName" header="Last Name" sortable filter />
          <Column field="email" header="Email" sortable filter />
        </AdminTable>
      </Card>
    </>
  );
};

export default UsersPage;
