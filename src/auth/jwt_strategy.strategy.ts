import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'jknkjnskdjngkjfnsdklgnskljgnskljngkjsndfkjgnskljgnkjsndfkjgnskjng'
        })
    }

    async validate(payload: any) {
        const {_id, username, email} = payload;
        return {_id, username, email};
    }
}