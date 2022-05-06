export const checkResponse = (response) => {
    if (response.ok) {
      return response.json()
    }
  }
  