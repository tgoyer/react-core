using System.Collections.Generic;
using System.Security.Claims;

namespace ReactCore.Data.Models.User
{
    public class User
    {
        public User()
        {}

        public User(int userID)
            : this(userID, string.Empty, string.Empty, string.Empty, string.Empty, false, new List<Claim>())
        {}

        public User(
            int userID, string userName, string firstName, string lastName,
            string emailAddress, bool isAuthorised, List<Claim> claims
        ) {
            UserName = userName;
            EmailAddress = emailAddress;
            FirstName = firstName;
            LastName = lastName;
            UserID = userID;
            IsAuthorised = isAuthorised;
            Claims = claims;
        }

        public string UserName { get; set; }
        public string EmailAddress { get; set; }
        public string FirstName { get; set; }
        public string FullName
        {
            get { 
                return (FirstName == string.Empty || LastName == string.Empty) 
                    ? string.Empty 
                    : $"{FirstName} {LastName}";
            }
        }
        public string LastName { get; set; }
        public int UserID { get; set; }
        public bool IsAuthorised { get; set; }
        public List<Claim> Claims { get; set; }

        public override string ToString()
        {
            return string.Format("{0} ({1})", ((FullName == string.Empty) ? "{Anonymous}" : FullName), UserID);
        }
    }
}
