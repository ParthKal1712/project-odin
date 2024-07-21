# Project Odin

## Steps

1. Install a new Nest JS Project using the following command:

```bash
nest new project-odin
```

2. We can start our project using:

```bash
pnpm run start:dev
```

3. In order to make the Environment Variables Type-safe and validate them at the start, we will create an Env Module using:

```bash
nest g module env
```

4. We will create a service for this module to handle our Environment Variables using:
```bash
nest g service env --no-spec
```
