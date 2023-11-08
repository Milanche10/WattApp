namespace ToDoList.API
{
    public class Task
    {
        public int Id { get; set; }
        public string Input { get; set; } = string.Empty;
        public bool Checked { get; set; }
    }
}
