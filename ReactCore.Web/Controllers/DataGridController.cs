using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;
using ReactCore.Data.Models.DataGrid;
using ReactCore.Data.Services;
using ReactCore.Web.Attributes.Authorization;

namespace ReactCore.Web.Controllers
{
    [ApiVersion("1.0")]
    [Route("datagrid")]
    public class DataGridController: BaseController<UserController>
    {
        private DataGridService dataGridService;

        public DataGridController(DataGridService dataGridService) {
            this.dataGridService = dataGridService;
        }

        /// <summary>
        /// Retrieve mock data grid data.
        /// </summary>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <response code="403">Requires <see cref="ClaimsAuthorizationConstants.Claims.Read"/> claim.</response>
        [ClaimsAuthorize(ClaimsAuthorizationConstants.Claims.Read)]
        [HttpGet("")]
        [MapToApiVersion("1.0")]
        public IEnumerable<DataGrid> GetDataGridData()
        {
            return dataGridService.GetDataGridData();
        }
    }
}
