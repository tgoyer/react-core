using System.Collections.Generic;

namespace App.Data.Models.User
{
    public class User
    {
        public int? UserId { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public IEnumerable<UserClaim> Claims { get; set; }

        public string DisplayName => (FirstName == string.Empty || LastName == string.Empty) ? string.Empty : $"{LastName}, {FirstName}";
        public string FullName => (FirstName == string.Empty || LastName == string.Empty) ? string.Empty : $"{FirstName} {LastName}";
    }
}