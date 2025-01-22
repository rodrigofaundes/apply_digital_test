import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SyncService } from 'src/sync/sync.service';

@Injectable()
export class SeedService {
    constructor(
        private readonly authService: AuthService,
        private readonly syncService: SyncService,
    ){}

    populateDB(){
        this.authService.fillSeedUser( { email: "rodrigofaundes@applydigital.com", password: "ApplyTest@123" });
        this.syncService.syncProducts()

        return 'Seed executed';
    }
}
