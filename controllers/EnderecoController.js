const axios = require('axios');
const {Endereco} = require('../models');

exports.createEnderecoCep = async (req, res) => {
    try {
        const { cep } = req.params;
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (response.data.erro) {
            return res.status(404).json({ error: 'CEP não encontrado' });
        }

        const { logradouro, complemento, bairro, cidade, estado, municipioibge } = response.data;

        novoEndereco = await Endereco.create({
            Cep: cep,
            Logradouro: logradouro,
            Numero: req.body.Numero, 
            Complemento: complemento || req.body.Complemento,
            Bairro: bairro,
            Cidade: cidade,
            Estado: estado,
            MunicipioIBGE: municipioibge,
        });

        res.status(201).json(novoEndereco);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o endereço', details: error.message });
    }};

exports.createEndereco = async (req, res) => {
    try {
        const {Cep, Logradouro, Numero, Complemento, Bairro, Cidade, Estado, MunicipioIBGE} = req.body;

        const novoEndereco = await Endereco.create({
            Cep,
            Logradouro,
            Numero,
            Complemento,
            Bairro,
            Cidade,
            Estado,
            MunicipioIBGE,
        });

        res.status(201).json(novoEndereco);
    }catch(error) {
        res.status(500).json({ error: 'Erro ao criar endereço', details: error.message});
    }
};

exports.getAllEnderecos = async (req, res) => {
    try {
        const enderecos = await Endereco.findAll();
        res.status(200).json(enderecos);
    }catch(error) {
        res.status(500).json({ error: 'Erro ao buscar endereços', details: error.message});
    }
};

exports.getEnderecoById = async (req, res) => {
    try {
        const { Id } = req.params;
        const endereco = await Endereco.findByPk(Id);

        if (!endereco) {
            return res.status(404).json({ error: 'Endereço não encontrado'});
        }

        res.status(200).json(enderecos);
    }catch(error) {
        res.status(500).json({ error: 'Erro ao buscar endereço', details: error.message});
    }
}

exports.updateEndereco = async (req, res) => {
    try {
        const { Id } = req.params;
        const {Cep, Logradouro, Numero, Complemento, Bairro, Cidade, Estado, MunicipioIBGE} = req.body;

        const endereco = await Endereco.findByPk(Id);

        if (!endereco) {
            return res.status(404).json({ error: 'Endereço não encontrado'})
        }

        endereco.Cep = Cep;
        endereco.Logradouro = Logradouro;
        endereco.Numero = Numero;
        endereco.Complemento = Complemento;
        endereco.Bairro = Bairro;
        endereco.Cidade = Cidade;
        endereco.Estado = Estado;
        endereco.MunicipioIBGE = MunicipioIBGE;

        await endereco.save();

        res.status(200).json(enderecos)
    }catch(error) {
        res.status(500).json({ error: 'Erro ao buscar endereço', details: error.message})
    }
}

exports.deleteEndereco = async (req, res) => {
    try {
        const { Id } = req.params;
        const endereco = await Endereco.findByPk(Id)

        if (!endereco) {
            return res.status(404).json({ error: 'Endereço não encontrado'})
        }

        await endereco.destroy();

        res.status(204).send();
    }catch(error) {
        res.status(500).json({ error: 'Erro ao buscar endereço', details: error.message})
    }
}
