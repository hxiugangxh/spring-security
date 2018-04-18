package com.hxg.security;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.social.security.SocialUser;
import org.springframework.social.security.SocialUserDetails;

import java.util.Collection;

@Data
public class MyUserDetail extends SocialUser {
    private String myDefined;
    public MyUserDetail(String username, String password, boolean enabled, boolean
            accountNonExpired, boolean credentialsNonExpired, boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
    }
}
