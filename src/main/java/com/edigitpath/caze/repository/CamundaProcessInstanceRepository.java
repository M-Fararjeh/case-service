package com.edigitpath.caze.repository;

import com.edigitpath.caze.domain.CamundaProcessInstance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the CamundaProcessInstance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CamundaProcessInstanceRepository extends JpaRepository<CamundaProcessInstance, Long> {

    @Query(value = "select distinct camunda_process_instance from CamundaProcessInstance camunda_process_instance left join fetch camunda_process_instance.cazeInstances",
        countQuery = "select count(distinct camunda_process_instance) from CamundaProcessInstance camunda_process_instance")
    Page<CamundaProcessInstance> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct camunda_process_instance from CamundaProcessInstance camunda_process_instance left join fetch camunda_process_instance.cazeInstances")
    List<CamundaProcessInstance> findAllWithEagerRelationships();

    @Query("select camunda_process_instance from CamundaProcessInstance camunda_process_instance left join fetch camunda_process_instance.cazeInstances where camunda_process_instance.id =:id")
    Optional<CamundaProcessInstance> findOneWithEagerRelationships(@Param("id") Long id);

}
