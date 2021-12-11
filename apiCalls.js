export const LoginApi = async (email, password) => {
  const db = [
    {
      id: 1,
      email: "admin@gmail.com",
      password: "123456",
    },
  ];
  //   const values = {
  //     email,
  //     password,
  //   };

  const filter = db.filter(
    (item) => item.email === email && item.password === password
  );

  if (!filter.length) {
    return new Promise((resolve, reject) => {
      return reject("login error");
    });
  }

  return new Promise((resolve, reject) => {
    return resolve(filter[0]);
  });

  //   try {
  //     const data = await axios.post(`${server}/auth/login`, values);
  //     return new Promise((resolve, reject) => {
  //       return resolve(data);
  //     });
  //   } catch (error) {
  //     return new Promise((resolve, reject) => {
  //       return reject("login error");
  //     });
  //   }
};
