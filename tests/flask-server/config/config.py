class Config(object):
    """
    Common configurations
    """

    # Put any configurations here that are common across all environments


class DevelopmentConfig(Config):
    """
    Development configurations
    """

    DEBUG = True
    SECRET_KEY = 'p9Bv<3Eid9%$i01'

class ProductionConfig(Config):
    """
    Production configurations
    """

    DEBUG = False
    SECRET_KEY = 'p9Bv<3Eid9%$i01'


app_config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig
}


# 'development' or 'production'
config_name = "development"

effective_config = app_config[config_name]

