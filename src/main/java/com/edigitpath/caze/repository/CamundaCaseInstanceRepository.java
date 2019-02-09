package com.edigitpath.caze.repository;

import com.edigitpath.caze.domain.CamundaCaseInstance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the CamundaCaseInstance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CamundaCaseInstanceRepository extends JpaRepository<CamundaCaseInstance, Long> {

    @Query(value = "select distinct camunda_case_instance from CamundaCaseInstance camunda_case_instance left join fetch camunda_case_instance.cazeInstances",
        countQuery = "select count(distinct camunda_case_instance) from CamundaCaseInstance camunda_case_instance")
    Page<CamundaCaseInstance> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct camunda_case_instance from CamundaCaseInstance camunda_case_instance left join fetch camunda_case_instance.cazeInstances")
    List<CamundaCaseInstance> findAllWithEagerRelationships();

    @Query("select camunda_case_instance from CamundaCaseInstance camunda_case_instance left join fetch camunda_case_instance.cazeInstances where camunda_case_instance.id =:id")
    Optional<CamundaCaseInstance> findOneWithEagerRelationships(@Param("id") Long id);

}
