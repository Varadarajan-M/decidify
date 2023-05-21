namespace Decidify.Repository.Models
{
    public class ResponseMessageOutput
    {
        public ResponseMessageOutput(bool ok, string message)
        {
            this.ok = ok;
            this.message = message;
        }
        public ResponseMessageOutput(bool ok, string message, Dictionary<string, object> data)
        {
            this.ok = ok;
            this.message = message;
            this.data = data;
        }
        public bool ok { get; set; }
        public string message { get; set; }
        public Dictionary<string, object>? data { get; set; }
    }
}
