using System;
using System.Collections.Generic;
using System.Linq;

using ReactCore.Data.Models;

namespace ReactCore.Data.Extensions
{
    public static class ReadExtensions
    {
        public static List<T> SelectAll<T>(this IReadableService<T> service) where T : class, IEntity
        {
            return service.DataStore
                .GetCollection<T>()
                .AsQueryable()
                .ToList();
        }

        public static T SelectFirst<T>(this IReadableService<T> service, Func<T, bool> predicate) where T : class, IEntity
        {
            return service.DataStore
                .GetCollection<T>()
                .AsQueryable()
                .Where(predicate)
                .FirstOrDefault();
        }

        public static List<T> SelectMany<T>(this IReadableService<T> service, Func<T, bool> predicate) where T : class, IEntity
        {
            return service.DataStore
                .GetCollection<T>()
                .AsQueryable()
                .Where(predicate)
                .ToList();
        }

        public static T SelectById<T>(this IReadableService<T> service, int id) where T : class, IEntity
        {
            return service.DataStore
                .GetCollection<T>()
                .AsQueryable()
                .Where(e => e.Id == id)
                .FirstOrDefault();
        }
    }
}
