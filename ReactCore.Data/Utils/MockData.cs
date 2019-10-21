using System;

using JsonFlatFileDataStore;

using ReactCore.Data.Models.DataGrid;
using ReactCore.Data.Models.ToDo;
using ReactCore.Data.Models.User;

namespace ReactCore.Data.Utils
{
    public class MockData
    {
        public static void LoadMockData(DataStore store, string type)
        {
            switch (type) {
                case "DataGridService":
                    LoadDataGrid(store);
                    break;
                case "ProjectService":
                    LoadProjects(store);
                    break;
                case "TaskService":
                    LoadTasks(store);
                    break;
                case "UserService":
                    LoadUser(store);
                    break;
            }
        }

        private static void LoadDataGrid(DataStore store)
        {
            Random rnd = new Random();
            var collection = store.GetCollection<DataGrid>();
            for (int x = 0; x < 100; x++)
            {
                int id = x + 1;
                collection.InsertOne(new DataGrid
                {
                    Id = x + id,
                    Title = $"Row {id}",
                    Count1 = rnd.Next(0, 100),
                    Count2 = rnd.Next(0, 100),
                    Count3 = rnd.Next(0, 100),
                    Count4 = rnd.Next(0, 100),
                    Count5 = rnd.Next(0, 100),
                    Count6 = rnd.Next(0, 100),
                    Count7 = rnd.Next(0, 100),
                    Count8 = rnd.Next(0, 100),
                    Count9 = rnd.Next(0, 100),
                    Count10 = rnd.Next(0, 100),
                    Count11 = rnd.Next(0, 100),
                    Count12 = rnd.Next(0, 100),
                    Count13 = rnd.Next(0, 100),
                    Count14 = rnd.Next(0, 100),
                    Count15 = rnd.Next(0, 100),
                    Count16 = rnd.Next(0, 100)
                });
            }
        }

        private static void LoadProjects(DataStore store)
        {
            var collection = store.GetCollection<Project>();
            Random rnd = new Random();
            for (int x = 0; x < 6; x++) {
                int id = x + 1;
                int userId = (x / 2) + 1;

                collection.InsertOne(new Project
                {
                    Id = id,
                    UserId = userId,
                    Name = $"Project {id}"
                });
            }
        }

        private static void LoadTasks(DataStore store)
        {
            var collection = store.GetCollection<Task>();
            Random rnd = new Random();
            for (int x = 0; x < 50; x++)
            {
                int id = x + 1;
                string taskName = $"Task #{id}";
                int userId = rnd.Next(0, 3);

                int projectId = (userId * 2) + rnd.Next(1, 3);

                collection.InsertOne(new Task
                {
                    Id = id,
                    ProjectId = projectId,
                    UserId = userId + 1,
                    Name = taskName,
                    DueDate = DateTime.Now.AddDays(rnd.Next(-15, 60)),
                    Comments = "Comment on " + taskName,
                    IsComplete = rnd.Next(1, 3) == 2
                });
            }
        }

        private static void LoadUser(DataStore store)
        {
            var collection = store.GetCollection<User>();
            for (int x = 0; x < 3; x++)
            {
                int id = x + 1;
                collection.InsertOne(new User
                {
                    Id = id,
                    UserName = "",
                    FirstName = "Login",
                    LastName = $"User {id}",
                    EmailAddress = "",
                    IsAuthorized = false
                });
            }
        }
    }
}
