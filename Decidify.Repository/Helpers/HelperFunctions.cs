using Newtonsoft.Json;
using System.Text.RegularExpressions;

namespace Decidify.Repository.Helper
{
    public class HelperFunctions
    {
        public static string FilterSplCharacters(string pollOptions)
        {
            Regex regex = new Regex(@"[^\w\s]", RegexOptions.Compiled);
            return regex.Replace(pollOptions, "");
        }
        public static Dictionary<string, TValue> ObjectToDictionary<TValue>(object obj)
        {
            var json = JsonConvert.SerializeObject(obj);
            var dictionary = JsonConvert.DeserializeObject<Dictionary<string, TValue>>(json);
            return dictionary;
        }
        public static Dictionary<string, TValue> StringToDictionary<TValue>(string obj)
        {
            var dictionary = JsonConvert.DeserializeObject<Dictionary<string, TValue>>(obj);
            return dictionary;
        }
    }

}
