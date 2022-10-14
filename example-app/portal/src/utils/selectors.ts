export const getUserData = (data: Record<string, any>) => ({
  firstName: data.firstName,
  lastName: data.lastName,
  email: data.email,
  phone: data.phone
})

export const getAddressData = (data: Record<string, any>) => ({
  address1: data.address1,
  address2: data.address2,
  country: data.country,
  state: data.state,
  city: data.city,
  postalCode: data.postalCode
})
