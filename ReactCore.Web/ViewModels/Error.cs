using Newtonsoft.Json;

namespace ReactCore.Web.ViewModels
{
    public class Error
    {
        public int Code { get; set; }
        public string Message { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
