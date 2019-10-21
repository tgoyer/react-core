using System;

namespace ReactCore.Data.Models.ToDo
{
    public class Task : IEntity
    {
        public int? Id { get; set; }
        public int ProjectId { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public DateTime DueDate { get; set; }
        public string Comments { get; set; }
        public bool IsComplete { get; set; }
    }
}
