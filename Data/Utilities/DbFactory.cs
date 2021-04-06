using App.Data.Extensions;
using App.Data.Models.AppSettings;
using Dapper;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace App.Data.Utilities
{
    public class DbFactory<TType>
    {
        private Database dbSettings;

        public DbFactory(
            ILogger<TType> logger,
            IOptions<AppSettings> settings
        )
        {
            dbSettings = settings.Value?.Database;
            Logger = logger;
        }

        public async Task<IEnumerable<dynamic>> ExecuteListAsync(string sql, object values, CommandType type = CommandType.Text)
        {
            using (var connection = GetDbConnection())
            {
                try
                {
                    return await connection.QueryAsync(sql, values, commandType: type);
                }
                catch (Exception ex)
                {
                    Logger.LogError(ex.Message, ex);
                    throw;
                }
                finally
                {
                    Cleanup(connection, sql, values);
                }
            }
        }

        public async Task<IEnumerable<T>> ExecuteListAsync<T>(string sql, object values, CommandType type = CommandType.Text)
        {
            using (var connection = GetDbConnection())
            {
                try
                {
                    return await connection.QueryAsync<T>(sql, values, commandType: type);
                }
                catch (Exception ex)
                {
                    Logger.LogError(ex.Message, ex);
                    throw;
                }
                finally
                {
                    Cleanup(connection, sql, values);
                }
            }
        }

        public async Task<T> ExecuteMultipleResultsAsync<T>(string sql, object values, Func<SqlMapper.GridReader, T> function, CommandType type = CommandType.Text)
        {
            using (var connection = GetDbConnection())
            {
                try
                {
                    var result = await connection.QueryMultipleAsync(sql, values, commandType: type);
                    return function(result);
                }
                catch (Exception ex)
                {
                    Logger.LogError(ex.Message, ex);
                    throw;
                }
                finally
                {
                    Cleanup(connection, sql, values);
                }
            }
        }

        public async Task<dynamic> ExecuteSingleAsync(string sql, object values, CommandType type = CommandType.Text)
        {
            using (var connection = GetDbConnection())
            {
                try
                {
                    return await connection.QueryFirstOrDefaultAsync(sql, values, commandType: type);
                }
                catch (Exception ex)
                {
                    Logger.LogError(ex.Message, ex);
                    throw;
                }
                finally
                {
                    Cleanup(connection, sql, values);
                }
            }
        }

        public async Task<T> ExecuteSingleAsync<T>(string sql, object values, CommandType type = CommandType.Text)
        {
            using (var connection = GetDbConnection())
            {
                try
                {
                    return await connection.QueryFirstOrDefaultAsync<T>(sql, values, commandType: type);
                }
                catch (Exception ex)
                {
                    Logger.LogError(ex.Message, ex);
                    throw;
                }
                finally
                {
                    Cleanup(connection, sql, values);
                }
            }
        }

        private ILogger<TType> Logger { get; set; }

        private void Cleanup(IDbConnection connection, string sql, object values)
        {
            LogInformation("[SQL]", sql, values);

            if (connection.State == ConnectionState.Open)
            {
                connection.Close();
            }
        }

        private void LogInformation(string type, string sql, object values)
        {
            Logger.LogInformation($"{type}: {sql}", values);

            var valueFields = values.ToDictionary();
            foreach (var field in valueFields)
            {
                Logger.LogInformation($"\t\t[Param] {field.Key}: {field.Value}");
            }
        }

        private IDbConnection GetDbConnection() => new SqliteConnection(dbSettings.ConnectionString);
    }
}