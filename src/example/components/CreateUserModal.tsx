import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import {
  AddressCountry,
  AdminForm,
  AdminInputCountry,
  AdminInputEmail,
  AdminInputNumber,
  AdminInputPhone,
  AdminInputState,
  AdminInputText,
} from "../../lib";

interface Props {
  loading?: boolean;
  defaultValues?: any;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, any>) => void;
}

export const CreateUserModal: React.FC<Props> = ({
  defaultValues,
  isOpen,
  onClose,
  onSubmit,
  loading,
}) => {
  const [selectedCountry, setSelectedCountry] =
    React.useState<AddressCountry>();
  return (
    <>
      <Dialog
        maskStyle={{ zIndex: 0 }}
        header={() => (
          <div className="self-center">
            <div className="font-light text-lg">Create User</div>
          </div>
        )}
        onHide={onClose}
        visible={isOpen}
        className="w-3/4"
      >
        <AdminForm
          className="grid sm:grid-cols-2 grid-cols-1 gap-4 my-2"
          defaultValues={defaultValues}
          onSubmit={onSubmit}
        >
          <AdminInputText
            required
            containerClassName="w-full"
            name="firstName"
            label="First Name"
          />
          <AdminInputText
            required
            containerClassName="w-full"
            name="lastName"
            label="Last Name"
          />
          <AdminInputEmail
            required
            containerClassName="w-full"
            name="email"
            label="Email"
          />
          <AdminInputPhone
            required
            containerClassName="w-full"
            name="phone"
            label="Phone"
          />
          <AdminInputText
            isTextArea
            required
            containerClassName="w-full"
            name="address1"
            label="Address 1"
          />
          <AdminInputText
            isTextArea
            required
            containerClassName="w-full"
            name="address2"
            label="Address 2"
          />
          <AdminInputCountry
            required
            containerClassName="w-full"
            name="country"
            label="Country"
            onCountrySelect={setSelectedCountry}
          />
          <AdminInputState
            required
            containerClassName="w-full"
            name="state"
            label="State"
            countryCode={selectedCountry?.code || ""}
          />
          <AdminInputText
            required
            containerClassName="w-full"
            name="city"
            label="City"
          />
          <AdminInputNumber
            required
            containerClassName="w-full"
            name="postal_code"
            label="Postal Code"
          />
          <div className="grid sm:col-span-2 place-content-center">
            <Button
              className="w-48 flex justify-center disabled:w-48 disabled:gap-2"
              type="submit"
              loading={loading}
            >
              Save
            </Button>
          </div>
        </AdminForm>
      </Dialog>
    </>
  );
};
