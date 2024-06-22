    namespace PhamQuocHuy_Workflow_BaiTongHop.Models
    {
        public static class StaticClass
        {
            public static List<Users> users = new List<Users>
            {
                  new Users
                {
                    FullName = "Nguyễn Văn A",
                    PhoneNumber = "0123456789",
                    BirthDate = new DateTime(2001, 1, 1),
                    Gender = "Nam",
                    Province = "TP. Hố Chí Minh",
                    Username = "nguyenvana",
                    Password = "password123"
                },
                new Users
                {
                    FullName = "Trần Thị B",
                    PhoneNumber = "0987654321",
                      BirthDate = new DateTime(2001, 1, 1),
                    Gender = "Nữ",
                    Province = "TP HCM",
                    Username = "tranthib",
                    Password = "password456"
                }
            };
            public static List<Users> GetUsers()
            {
                return users;
            }
            public static void AddUser(Users user)
            {
                users.Add(user);
            }
        }
    }
