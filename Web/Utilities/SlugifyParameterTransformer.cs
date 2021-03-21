using App.Web.Extensions;
using Microsoft.AspNetCore.Routing;

namespace App.Web.Utilities
{
    public class SlugifyParameterTransformer : IOutboundParameterTransformer
    {
        public string TransformOutbound(object value)
        {
            if (value == null)
            {
                return null;
            }

            return value.ToString().ToSlug();
        }
    }
}