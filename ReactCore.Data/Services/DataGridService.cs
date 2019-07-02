using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

using ReactCore.Data.Models.DataGrid;
using System;
using System.Collections.Generic;

namespace ReactCore.Data.Services
{
    public class DataGridService: BaseService<DataGridService>
    {
        public DataGridService(ILogger<DataGridService> logger, IConfiguration configuration) : base(logger, configuration) { }

        public IEnumerable<DataGrid> GetDataGridData() {
            List<DataGrid> data = new List<DataGrid>();
            Random rnd = new Random();

            for (int x = 0; x < 100; x++) {
                data.Add(new DataGrid
                {
                    ID = x + 1,
                    Title = $"Row {x + 1}",
                    Count1 = rnd.Next(0, 100),
                    Count2 = rnd.Next(0, 100),
                    Count3 = rnd.Next(0, 100),
                    Count4 = rnd.Next(0, 100),
                    Count5 = rnd.Next(0, 100),
                    Count6 = rnd.Next(0, 100),
                    Count7 = rnd.Next(0, 100),
                    Count8 = rnd.Next(0, 100)
                }); ;
            }

            return data;
        }
    }
}