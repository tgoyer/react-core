namespace ReactCore.Data.Models.User
{
    public class Role : IEntity
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
    }
}