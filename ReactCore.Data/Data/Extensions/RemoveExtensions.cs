using System;

using ReactCore.Data.Models;

namespace ReactCore.Data.Extensions
{
    public static class RemoveExtensions
    {
        public static bool RemoveOne<T>(this IRemovableService<T> service, int id) where T : class, IEntity
        {
            var collection = service.DataStore.GetCollection<T>();
            return collection.DeleteOne(id);
        }

        public static bool RemoveMany<T>(this IRemovableService<T> service, Predicate<T> predicate) where T : class, IEntity
        {
            var collection = service.DataStore.GetCollection<T>();
            return collection.DeleteMany(predicate);
        }
    }
}
