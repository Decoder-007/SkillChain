module 0xc0f69f893f6ad5a72834e917aa3242abd5b48d878501e5e0003a6d5c5cf8a3fb::SkillVerification {

    use aptos_framework::signer;
    use std::string;
    use std::vector;

    struct Challenge has key, store, copy {
        challenge_id: u64,
        organization: address,
        title: string::String,
        description: string::String,
        valid_until: u64,
    }

    struct Credential has key, store, copy {
        credential_id: u64,
        user: address,
        challenge_id: u64,
        skill_name: string::String,
        timestamp: u64,
    }

    struct SkillChainStore has key {
        challenges: vector<Challenge>,
        credentials: vector<Credential>,
    }

    public fun create_challenge(
        account: &signer, 
        challenge_id: u64, 
        title: string::String, 
        description: string::String, 
        valid_until: u64
    ) acquires SkillChainStore {
        let organization = signer::address_of(account);
        let store = borrow_global_mut<SkillChainStore>(organization);
        let challenge = Challenge {
            challenge_id,
            organization,
            title,
            description,
            valid_until,
        };
        vector::push_back(&mut store.challenges, challenge);
    }

    public fun submit_credential(
        account: &signer, 
        credential_id: u64, 
        challenge_id: u64, 
        skill_name: string::String, 
        timestamp: u64
    ) acquires SkillChainStore {
        let user = signer::address_of(account);
        let store = borrow_global_mut<SkillChainStore>(user);
        let credential = Credential {
            credential_id,
            user,
            challenge_id,
            skill_name,
            timestamp,
        };
        vector::push_back(&mut store.credentials, credential);
    }

    public fun get_challenges(account: address): vector<Challenge> acquires SkillChainStore {
        let store = borrow_global<SkillChainStore>(account);
        store.challenges
    }

    public fun get_credentials(account: address): vector<Credential> acquires SkillChainStore {
        let store = borrow_global<SkillChainStore>(account);
        store.credentials
    }

    public fun initialize(account: &signer) {
        let _organization = signer::address_of(account);
        move_to(account, SkillChainStore {
            challenges: vector::empty(),
            credentials: vector::empty(),
        });
    }
}
