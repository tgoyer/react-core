using System.Collections.Generic;
using System.Security.Claims;

namespace ReactCore.Data.Models.User
{
    public class User : IEntity
    {
        public User()
        {}

        public User(int? userID)
            : this(userID, string.Empty, string.Empty, string.Empty, string.Empty, false, new List<Claim>())
        {}

        public User(
            int? userID, string userName, string firstName, string lastName,
            string emailAddress, bool isAuthorised, List<Claim> claims
        ) {
            Id = userID;
            UserName = userName;
            EmailAddress = emailAddress;
            FirstName = firstName;
            LastName = lastName;
            IsAuthorized = isAuthorised;
            Claims = claims;
        }

        public int? Id { get; set; }
        public string UserName { get; set; }
        public string EmailAddress { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsAuthorized { get; set; }
        public List<Claim> Claims { get; set; }
        public string FullName
        {
            get { 
                return (FirstName == string.Empty || LastName == string.Empty) 
                    ? string.Empty 
                    : $"{FirstName} {LastName}";
            }
        }

        public override string ToString()
        {
            return string.Format("{0} ({1})", ((FullName == string.Empty) ? "{Anonymous}" : FullName), Id);
        }
    }
}
