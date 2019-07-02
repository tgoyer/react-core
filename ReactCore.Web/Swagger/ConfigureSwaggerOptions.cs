using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace ReactCore.Web.Swagger
{
    public class ConfigureSwaggerOptions : IConfigureOptions<SwaggerGenOptions>
    {
        readonly IApiVersionDescriptionProvider provider;

        /// <summary>
        /// Initializes a new instance of the <see cref="ConfigureSwaggerOptions"/> class.
        /// </summary>
        /// <param name="provider">The <see cref="IApiVersionDescriptionProvider">provider</see> used to generate Swagger documents.</param>
        public ConfigureSwaggerOptions(IApiVersionDescriptionProvider provider) => this.provider = provider;

        /// <inheritdoc />
        public void Configure(SwaggerGenOptions options)
        {
            // add a swagger document for each discovered API version
            // note: you might choose to skip or document deprecated API versions differently
            foreach (var description in provider.ApiVersionDescriptions)
            {
                options.SwaggerDoc(description.GroupName, CreateInfoForApiVersion(description));
            }
        }

        static Info CreateInfoForApiVersion(ApiVersionDescription description)
        {
            var version = description.ApiVersion.ToString();

            var info = new Info()
            {
                Version = version,
                Title = $"/api/v{version}",
                Description = "Documentation for ReactCore REST API.",
                //TermsOfService = "None",
                //Contact = new Contact
                //{
                //    Name = "ReactCore Feedback Team",
                //    Url = "https://github.com/Spiffdog-Design/react-core/issues"
                //}
                //License = new License
                //{
                //    Name = "Use under LICX",
                //    Url = "https://example.com/license"
                //}
            };

            if (description.IsDeprecated)
            {
                info.Description += " This API version has been deprecated.";
            }

            return info;
        }
    }
}
