using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;

using ReactCore.Data.Extensions;
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
        [HttpGet()]
        [MapToApiVersion("1.0")]
        public IEnumerable<DataGrid> GetDataGridData()
        {
            return dataGridService.SelectAll();
        }

        /// <summary>
        /// Delete a mock data grid data row.
        /// </summary>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <response code="403">Requires <see cref="ClaimsAuthorizationConstants.Claims.Read"/> and  <see cref="ClaimsAuthorizationConstants.Claims.Write"/> claims.</response>
        [ClaimsAuthorize(ClaimsAuthorizationConstants.Claims.Read)]
        [ClaimsAuthorize(ClaimsAuthorizationConstants.Claims.Write)]
        [HttpDelete()]
        [MapToApiVersion("1.0")]
        public bool DeleteDataGridData(int id)
        {
            return dataGridService.RemoveOne(id);
        }

        /// <summary>
        /// Insert a mock data grid data row.
        /// </summary>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <response code="403">Requires <see cref="ClaimsAuthorizationConstants.Claims.Read"/> and  <see cref="ClaimsAuthorizationConstants.Claims.Write"/> claims.</response>
        [ClaimsAuthorize(ClaimsAuthorizationConstants.Claims.Read)]
        [ClaimsAuthorize(ClaimsAuthorizationConstants.Claims.Write)]
        [HttpPost()]
        [MapToApiVersion("1.0")]
        public bool SaveDataGridData(DataGrid item)
        {
            return dataGridService.InsertOne(item);
        }
    }
}
