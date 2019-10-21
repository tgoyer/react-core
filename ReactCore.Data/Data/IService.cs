using JsonFlatFileDataStore;

namespace ReactCore.Data
{
    public interface IService
    {
        DataStore DataStore { get; set; }
    }
}