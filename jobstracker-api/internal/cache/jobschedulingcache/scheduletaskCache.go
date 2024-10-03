package jobschedulingcache

import (
	"jobtrackker/internal/data/db"
	"sync"
)

// CacheManager encapsulates the cache operations
type CacheManager struct {
	cache []db.ScheduletaskRepo
	mu    sync.RWMutex
}

var instance *CacheManager
var once sync.Once

// GetInstance returns the singleton instance of CacheManager
func GetInstance() *CacheManager {
	once.Do(func() {
		instance = &CacheManager{
			cache: []db.ScheduletaskRepo{},
		}
	})
	return instance
}

// GetScheduleTaskCache returns the cache instance
func (cm *CacheManager) GetScheduleTaskCache() []db.ScheduletaskRepo {
	cm.mu.RLock()
	defer cm.mu.RUnlock()
	return cm.cache
}

// SetScheduleTaskCache sets the cache instance
func (cm *CacheManager) SetScheduleTaskCache(cache []db.ScheduletaskRepo) {
	cm.mu.Lock()
	defer cm.mu.Unlock()
	cm.cache = cache
}
