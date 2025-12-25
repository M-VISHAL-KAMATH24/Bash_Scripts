package com.chatapp.quikchat.repository;

import com.chatapp.quikchat.entity.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProfileRepository extends MongoRepository<Profile, String> {
    Optional<Profile> findByUserId(String userId);
    List<Profile> findByTagContainingIgnoreCase(String tag);
    boolean existsByTagIgnoreCase(String tag);
    List<Profile> findByTagIgnoreCase(String tag);
}
