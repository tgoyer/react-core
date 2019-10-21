namespace ReactCore.Data.Models.ToDo
{
    public class Project : IEntity
    {
        public int? Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
    }
}
