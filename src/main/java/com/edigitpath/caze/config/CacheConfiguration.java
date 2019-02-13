package com.edigitpath.caze.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.edigitpath.caze.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.edigitpath.caze.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.edigitpath.caze.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.edigitpath.caze.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.edigitpath.caze.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.edigitpath.caze.domain.CazeInstance.class.getName(), jcacheConfiguration);
            cm.createCache(com.edigitpath.caze.domain.CazeInstance.class.getName() + ".caseDataObjects", jcacheConfiguration);
            cm.createCache(com.edigitpath.caze.domain.CazeInstance.class.getName() + ".cazeInstances", jcacheConfiguration);
            cm.createCache(com.edigitpath.caze.domain.CazeInstance.class.getName() + ".camundaCaseInstances", jcacheConfiguration);
            cm.createCache(com.edigitpath.caze.domain.CazeInstance.class.getName() + ".camundaProcessInstances", jcacheConfiguration);
            cm.createCache(com.edigitpath.caze.domain.CazeType.class.getName(), jcacheConfiguration);
            cm.createCache(com.edigitpath.caze.domain.CamundaCaseInstance.class.getName(), jcacheConfiguration);
            cm.createCache(com.edigitpath.caze.domain.CamundaCaseInstance.class.getName() + ".cazeInstances", jcacheConfiguration);
            cm.createCache(com.edigitpath.caze.domain.CamundaProcessInstance.class.getName(), jcacheConfiguration);
            cm.createCache(com.edigitpath.caze.domain.CamundaProcessInstance.class.getName() + ".cazeInstances", jcacheConfiguration);
            cm.createCache(com.edigitpath.caze.domain.CaseDataObject.class.getName(), jcacheConfiguration);
            cm.createCache(com.edigitpath.caze.domain.ApiDataObject.class.getName(), jcacheConfiguration);
            cm.createCache(com.edigitpath.caze.domain.ApiDataObject.class.getName() + ".apiHeaders", jcacheConfiguration);
            cm.createCache(com.edigitpath.caze.domain.ApiHeader.class.getName(), jcacheConfiguration);
            cm.createCache(com.edigitpath.caze.domain.DbDataObject.class.getName(), jcacheConfiguration);
            cm.createCache(com.edigitpath.caze.domain.FileDataObject.class.getName(), jcacheConfiguration);
            cm.createCache(com.edigitpath.caze.domain.Category.class.getName(), jcacheConfiguration);
            cm.createCache(com.edigitpath.caze.domain.Category.class.getName() + ".subCategories", jcacheConfiguration);
            cm.createCache(com.edigitpath.caze.domain.CazeInstance.class.getName() + ".relatedCazes", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
