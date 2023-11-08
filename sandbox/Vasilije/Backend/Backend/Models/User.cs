namespace Backend.models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Password { get; set; }

        public User(int id, string firstName, string lastName, string password)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            Password = password;
        }
    }
}
