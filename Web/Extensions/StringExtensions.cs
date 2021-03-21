using System.Text;
using System.Text.RegularExpressions;

namespace App.Web.Extensions
{
    public static class StringExtensions
    {
        public static string ToSlug(this string value, bool toLower = true)
        {
            if (value == null)
            {
                return "";
            }

            var slug = Regex.Replace(value.Normalize(NormalizationForm.FormKD).ToString(), "([a-z])([A-Z])", "$1-$2");

            return toLower
                ? slug.ToLowerInvariant()
                : slug;
        }
    }
}