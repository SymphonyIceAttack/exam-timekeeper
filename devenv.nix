{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:

{
  # https://devenv.sh/basics/
  env.GREET = "devenv";

  # https://devenv.sh/services/
  # services.postgres.enable = true;

  dotenv = {
    enable = true;
    disableHint = true;
    filename = ".env.minmax";
  };

  tasks."biome:check" = {
    exec = "npx biome check --write";
    before = [ "devenv:enterShell" ];
  };

}
