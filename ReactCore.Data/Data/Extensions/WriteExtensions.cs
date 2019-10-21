using System;
using System.Collections.Generic;
using System.Linq;

using ReactCore.Data.Models;

namespace ReactCore.Data.Extensions
{
    public static class WriteExtensions
    {
        public static bool InsertOne<T>(this IWritableService<T> service, T entity) where T : class, IEntity
        {
            var collection = service.DataStore.GetCollection<T>();
            int id = collection.Count == 0 ? 1 : collection.GetNextIdValue();

            entity.Id = id;

            return collection.InsertOne(entity);
        }

        public static bool InsertMany<T>(this IWritableService<T> service, List<T> list) where T : class, IEntity
        {
            var collection = service.DataStore.GetCollection<T>();
            return collection.InsertMany(list);
        }

        public static bool UpdateOne<T>(this IWritableService<T> service, T entity) where T : class, IEntity
        {
            var collection = service.DataStore.GetCollection<T>();
            return collection.UpdateOne(entity.Id, entity);
        }

        public static bool UpdateMany<T>(this IWritableService<T> service, Predicate<T> predicate, List<T> list) where T : class, IEntity
        {
            var collection = service.DataStore.GetCollection<T>();
            return collection.UpdateMany(predicate, list);
        }
    }
}
