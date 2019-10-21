using System;
using System.Collections.Generic;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

using ReactCore.Data.Models.DataGrid;

namespace ReactCore.Data.Services
{
    public class DataGridService: 
        BaseService<DataGridService>, 
        IService,
        IReadableService<DataGrid>,
        IRemovableService<DataGrid>,
        IWritableService<DataGrid>
    {
        public DataGridService(ILogger<DataGridService> logger, IConfiguration configuration) : base(logger, configuration) { }
    }
}