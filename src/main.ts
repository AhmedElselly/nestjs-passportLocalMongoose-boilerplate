import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import helmet from 'helmet';
import * as session from 'express-session';
import * as passport from 'passport';

import { Strategy as LocalStrategy } from 'passport-local';
import UserModel1  from './schemas/user.schema';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


const PORT = process.env.PORT || 8001;

// mongoose.connect('mongodb://localhost:27017/nest').then(() => {
//   console.log('Connected to db');
// })

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug'],
  });
  app.use(morgan('dev'));
  app.use(helmet());

  app.use(
    session({
      secret: 'I love nodejs',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // const user: any = UserModel1;

  passport.use(new LocalStrategy({usernameField: 'email'}, UserModel1.authenticate()));

  passport.serializeUser(UserModel1.serializeUser());
  passport.deserializeUser(UserModel1.deserializeUser());

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.listen(PORT, () => {
    console.log(`Server is on port ${PORT}`);
  });
}
bootstrap();
